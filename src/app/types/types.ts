export interface ImageType {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
}

export interface ButtonType {
    openInNewTab?: boolean;
    path: string;
    buttonText: string;
    color?: string;
}

export interface Product {
    name?: string;
    shortDescription: string;
    description?: string;
    imageCoverOrContain: imageCoverOrContainObject[];
    pdpSlug?: string;
    category?: string;
    metaDescription?: string;
}

export interface BlockSettings {
    backgroundColor?: {color: string};
    blockPadding?: {
        paddingTop?: string;
        paddingBottom?: string;  
    }
}

export interface menuItem {
    name?: string;
    destinationPath?: string;
    id?: number;
    menuChild: menuChildItem[] | [];
    inspirationLink?: {
        heading?: string;
        destinationPath?: string;
        image?: ImageType;
    }
}

export interface menuChildItem {
    name?: string;
    destinationPath?: string;
    id?: number;
    description?: string;
}

export interface imageCoverOrContainObject {
    image: ImageType;
    isProductImage?: boolean;
}