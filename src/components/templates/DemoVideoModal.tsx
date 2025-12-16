import React from 'react';
import Modal from '../common/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  src: string;
  poster?: string;
};

const DemoVideoModal: React.FC<Props> = ({ isOpen, onClose, title, src, poster }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
          <video
            controls
            poster={poster}
            className="h-full w-full"
            src={src}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DemoVideoModal;



