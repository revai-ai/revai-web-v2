interface BrochureEmbedProps {
  src: string;
  title: string;
}

export default function BrochureEmbed({ src, title }: BrochureEmbedProps) {
  return (
    <div className="fixed inset-0 w-full h-full">
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
