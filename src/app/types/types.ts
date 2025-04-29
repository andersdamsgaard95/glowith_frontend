export interface ImageType {
    url: string;
    alternativeText?: string;

}

export interface ButtonType {
    openInNewTab?: boolean;
    path: string;
    buttonText: string;
    color?: string;
}

export interface BlockSettings {
    backgroundColor?: {color: string};
    blockPadding?: {
        paddingTop?: string;
        paddingBottom?: string;  
    }
}