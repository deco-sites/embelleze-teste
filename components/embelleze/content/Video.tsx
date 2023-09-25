import { useEffect } from "preact/hooks";

export interface VideoProps {
  videoId: string;
}

const Video = ({ videoId }: VideoProps) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}?color=white`;

  useEffect(() => {
    // Add a comment explaining the purpose of this useEffect.
    const lazyIframes = document.querySelectorAll(".lazy-iframe");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement;
            const src = iframe.getAttribute("data-src") ?? "";
            iframe.setAttribute("src", src);
            iframe.style.opacity = "1";
            console.log(iframe);
            observer.unobserve(iframe);
          }
        });
      },
      { rootMargin: "0px 0px 100px 0px" }, // Adjust the rootMargin as needed
    );

    lazyIframes.forEach((lazyIframe) => {
      observer.observe(lazyIframe);
    });
  }, []);

  return (
    <div class="video-container flex w-full h-full m-auto relative">
      <div class="video-overlay"></div>
      <iframe
        class="lazy-iframe w-full h-full"
        data-src={videoSrc}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  );
};

export default Video;
