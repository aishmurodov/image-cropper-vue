import {ImageCropperMode} from "./ImageCropperInterface";
import ImageCropperRatioInterface from "./ImageCropperRatioInterface";

interface ImageCropperAspectChangerInterface {
    mode: ImageCropperMode,
    ratios: Array<ImageCropperRatioInterface>,
    onRotationClick: () => void,
    onChangeRatio: (ratio: number) => void,
    onImageChange: (e: {}) => void,
    initedRatio: number,
    onSaveClick: () => void,
    freezeActions?: boolean
}

export default ImageCropperAspectChangerInterface