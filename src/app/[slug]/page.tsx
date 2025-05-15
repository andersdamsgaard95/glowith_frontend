import DynamicBlock from "../blocks/DynamicBlock";
import { fetchAllContentPages, fetchDynamicPageData } from "@/lib/api";

/*export async function generateStaticParams() {
  const allPages = await fetchAllContentPages();

  return allPages.map((page: any) => ({
    slug: page.slug
  }))
}*/

type Props = {
  params: Promise<{ slug: string }>
};

export default async function Page( { params }: Props ) {

  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <p>Slug not found</p>; // or handle error / 404 here
  }
  
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