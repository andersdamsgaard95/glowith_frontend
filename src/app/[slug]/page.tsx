import DynamicBlock from "../blocks/DynamicBlock";
import { fetchAllContentPages, fetchDynamicPageData } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateStaticParams() {
  const allPages = await fetchAllContentPages();

  return allPages.map((page: any) => ({
    slug: page.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const pageData = await fetchDynamicPageData(slug);

  return {
    title: pageData?.title || 'Default Page Title',
    description: pageData?.metaDescription || 'Default page description',
  };
}

export default async function Page( { params }: Props ) {

  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    return <p>Slug not found</p>; // or handle error / 404 here
  }
  
  const pageData = await fetchDynamicPageData(slug);

  const blocks = pageData?.blocks || [];

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