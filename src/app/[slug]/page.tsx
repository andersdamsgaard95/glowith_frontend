import DynamicBlock from "../blocks/DynamicBlock";
import { fetchAllContentPages, fetchDynamicPageData } from "@/lib/api";
import type { Metadata } from "next";
import PageNotFound from "../blocks/PageNotFoundComponent/PageNotFound";

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateStaticParams() {
  const allPages = await fetchAllContentPages();

  const possibleSlugs = allPages.filter((page: any) => {
    return page.slug !== "home"
  });

  return possibleSlugs.map((page: any) => ({
    slug: page.slug
  }));
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
    return <PageNotFound/>
  }
  
  const pageData = await fetchDynamicPageData(slug);

  const blocks = pageData?.blocks || [];

  if (blocks.length === 0) {
    return <PageNotFound/>
  }

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