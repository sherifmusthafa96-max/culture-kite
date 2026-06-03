import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

export default function OptimizedImage({
    src,
    alt,
    width = 300,
    height = 300,
    className = "",
    priority = false,
}: Props) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={className}
            loading={priority ? "eager" : "lazy"}
        />
    );
}