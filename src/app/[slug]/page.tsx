import DynamicBlock from "../blocks/DynamicBlock";
import { fetchAllContentPages, fetchDynamicPageData } from "@/lib/api";

export async function generateStaticParams() {
  const allPages = await fetchAllContentPages();

  return allPages.map((page: any) => ({
    slug: page.slug
  }))
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page( { params }: PageProps ) {

  const { slug } = params;
  
  const blocks = await fetchDynamicPageData(slug);

  return (
    <>
        {blocks.map((block:any) => {
            return (
                <DynamicBlock 
                    key={block.id}
                    blockName={block.__component} 
                    blockProps={block}
                /> 
            )
        })}
    </>
  );
}