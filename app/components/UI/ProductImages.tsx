import React, { useState, FC } from 'react'

interface ProductImagesProps {
    imageLinks: string[];
    imageAlt: string;
    content: any;
}

export const ProductImages: FC<ProductImagesProps> = ({ imageLinks, content, imageAlt }) => {
    const [image, setImage] = useState(imageLinks[0]);
    const [opacity, setOpacity] = useState(1);

    function handleHover(imageUrl: string) {
        setOpacity(0)
        setTimeout(() => {
            setImage(imageUrl)
            setOpacity(1)
        }, 100)
    }

    return (
        <div className={"productImages-cardWrapper"}>
            <div className={"productImages-card"}>
                <div className={"productImages"}>
                    <div className={"productImages-imgDisplay"}>
                        <div className={"productImages-imgShowcase"} style={{ opacity: opacity }}>
                            <img src={image} style={{width: "100%", height: "auto", backgroundColor: "white"}} alt={imageAlt}/>
                        </div>
                    </div>
                    <div className={"productImages-imageSelect"}>
                        {imageLinks.map((imageUrl: string, index: number) => {
                            return (
                                <a key={Math.random()} href='#'>
                                    <img key={Math.random()} src={imageUrl} className={"img"} alt={`${imageAlt} ${index}`}
                                        style={{
                                            border: imageUrl == image ? "2px solid orange" : "2px solid transparent",
                                            borderRadius: imageUrl == image ? "5px" : "0px",
                                        }}
                                        onMouseEnter={() => { imageUrl != image && handleHover(imageUrl) }} />
                                </a>
                            )
                        })}
                    </div>
                </div>
                <div className={"productImages-productContent"}>
                    {content}
                </div>
            </div>
        </div>
    )
}

