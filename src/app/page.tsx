export const dynamic = 'force-static';

import DynamicBlock from "./blocks/DynamicBlock";
import { fetchHomepageData } from "@/lib/api";
import type { Metadata } from "next";
import PageNotFound from "./blocks/PageNotFoundComponent/PageNotFound";

export async function generateMetadata(): Promise<Metadata> {
    const homepageData = await fetchHomepageData();

    return {
        title: homepageData?.title || 'Glowith Skincare',
        description: homepageData?.metaDescription || 'Default description for SEO.',
    };
}

export default async function HomePage() {

    const homepageData = await fetchHomepageData();

    const blocks = homepageData?.blocks || [];

    //console.log(blocks);

    if (blocks.length === 0) {
        return <PageNotFound/>
    }

    return (
        <>
            {blocks.map((block:any, index:number) => {
                return (
                    <DynamicBlock 
                            key={index}
                            blockName={block.__component} 
                            blockProps={block}
                        />
                    )
                
            })}
        </>
    )
}