using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using KWingX.Application.Interfaces.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;

namespace KWingX.Infrastructure.Storage;

public class MinioS3FileStorage : IFileStorage
{
    private readonly IAmazonS3 _s3Client;
    private readonly S3Options _options;
    private readonly ILogger<MinioS3FileStorage> _logger;
    private bool _bucketEnsured = false;
    private readonly object _lockObject = new();

    public MinioS3FileStorage(IOptions<S3Options> options, ILogger<MinioS3FileStorage> logger)
    {
        _options = options.Value;
        _logger = logger;

        var config = new AmazonS3Config
        {
            ServiceURL = _options.ServiceUrl,
            ForcePathStyle = true, // Required for MinIO
            UseHttp = !_options.UseSSL,
            RegionEndpoint = string.IsNullOrEmpty(_options.Region) 
                ? RegionEndpoint.USEast1 
                : RegionEndpoint.GetBySystemName(_options.Region)
        };

        _s3Client = new AmazonS3Client(_options.AccessKey, _options.SecretKey, config);
    }

    public async Task EnsureBucketExistsAsync(CancellationToken cancellationToken = default)
    {
        if (_bucketEnsured)
            return;

        lock (_lockObject)
        {
            if (_bucketEnsured)
                return;
        }

        try
        {
            // Check if bucket exists by trying to get bucket location
            bool exists = false;
            try
            {
                var locationRequest = new GetBucketLocationRequest
                {
                    BucketName = _options.BucketName
                };
                _s3Client.GetBucketLocationAsync(locationRequest, cancellationToken).GetAwaiter().GetResult();
                exists = true;
                _logger.LogInformation("S3 bucket already exists: {BucketName}", _options.BucketName);
            }
            catch (Amazon.S3.AmazonS3Exception ex) when (ex.StatusCode == HttpStatusCode.NotFound || ex.StatusCode == HttpStatusCode.Forbidden)
            {
                exists = false;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error checking bucket existence, will attempt to create: {BucketName}", _options.BucketName);
                exists = false;
            }
            
            if (!exists)
            {
                _logger.LogInformation("Creating S3 bucket: {BucketName}", _options.BucketName);
                var request = new PutBucketRequest
                {
                    BucketName = _options.BucketName
                };

                _s3Client.PutBucketAsync(request, cancellationToken).GetAwaiter().GetResult();
                _logger.LogInformation("Successfully created S3 bucket: {BucketName}", _options.BucketName);
            }

            // Set bucket policy for public read access
            try
            {
                var policy = $@"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": {{ ""AWS"": [""*""] }},
      ""Action"": [""s3:GetObject""],
      ""Resource"": [""arn:aws:s3:::{_options.BucketName}/*""]
    }}
  ]
}}";

                var putPolicyRequest = new PutBucketPolicyRequest
                {
                    BucketName = _options.BucketName,
                    Policy = policy
                };

                _s3Client.PutBucketPolicyAsync(putPolicyRequest, cancellationToken).GetAwaiter().GetResult();
                _logger.LogInformation("Set public-read policy for bucket: {BucketName}", _options.BucketName);
            }
            catch (Exception policyEx)
            {
                _logger.LogWarning(policyEx, "Failed to set bucket policy for {BucketName}, continuing anyway", _options.BucketName);
                // Non-critical, continue
            }

            lock (_lockObject)
            {
                _bucketEnsured = true;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error ensuring bucket exists: {BucketName}", _options.BucketName);
            throw;
        }
    }

    public async Task<FileUploadResult> UploadAsync(Stream stream, string contentType, string objectKey, CancellationToken cancellationToken = default)
    {
        await EnsureBucketExistsAsync(cancellationToken);

        try
        {
            var request = new PutObjectRequest
            {
                BucketName = _options.BucketName,
                Key = objectKey,
                InputStream = stream,
                ContentType = contentType,
                CannedACL = S3CannedACL.PublicRead
            };

            var response = await _s3Client.PutObjectAsync(request, cancellationToken);

            var url = $"{_options.PublicBaseUrl.TrimEnd('/')}/{objectKey}";

            return new FileUploadResult
            {
                Url = url,
                ObjectKey = objectKey,
                FileName = Path.GetFileName(objectKey),
                ContentType = contentType,
                Size = stream.Length
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file to S3: {ObjectKey}", objectKey);
            throw;
        }
    }

    public async Task DeleteAsync(string objectKey, CancellationToken cancellationToken = default)
    {
        try
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _options.BucketName,
                Key = objectKey
            };

            await _s3Client.DeleteObjectAsync(request, cancellationToken);
            _logger.LogInformation("Deleted file from S3: {ObjectKey}", objectKey);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file from S3: {ObjectKey}", objectKey);
            throw;
        }
    }
}

