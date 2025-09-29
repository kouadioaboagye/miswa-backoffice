const VideoSection = () => {
    return (
        <section className="mt-20 bg-gray-100 h-[600px] w-full">
            {/* Container vidéo */}
            <video
                className="w-full h-full object-cover"
                controls
                poster="/assets/video/generated.mp4"
                preload="metadata"
                loop
                autoPlay
            >
                <source src="/assets/video/generated.mp4" type="video/mp4" />
                <source src="/assets/video/generated.webm" type="video/webm" />
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        </section>
    );
};

export default VideoSection;
