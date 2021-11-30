import ImageCropperCloseEventInterface from "./ImageCropperCloseEventInterface";
import ImageCropperLanguagesInterface from "./ImageCropperLanguagesInterface";

export type ImageCropperMode = "default"|"avatar"

interface ImageCropperInterface {
    enabled: boolean,
    onClose: (e: ImageCropperCloseEventInterface) => void
    image: string,
    mode: ImageCropperMode,
    language?: ImageCropperLanguagesInterface,
    ratio?: number,
    angle?: number,
    freezeActions?: boolean,
    freezeActionsInner?: HTMLDivElement
}

export default ImageCropperInterface