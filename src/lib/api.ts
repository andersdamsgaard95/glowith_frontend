const API_URL = process.env.NEXT_PUBLIC_BACKEND_STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Homepage data
export async function fetchHomepageData() {
  const res = await fetch(`${API_URL}/api/content-pages?filters[slug][$eq]=home&populate=blocks.image,blocks.button,blocks.backgroundColor,blocks.multiBoxSmall.image,blocks.multiBoxSmall.backgroundColor,blocks.multiBoxSmall.imageCoverOrContain.image,blocks.multiBoxBig.image,blocks.multiBoxBig.backgroundColor,blocks.settings.backgroundColor,blocks.settings.blockPadding,blocks.textBackgroundColor,blocks.lineColor`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    //cache: 'no-store',
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch homepage data');
  }

  const json = await res.json();
  return json.data[0] || {};
}

//Dynamic Page Data
export async function fetchDynamicPageData(slug: string) {
    const res = await fetch(`${API_URL}/api/content-pages?filters[slug][$eq]=${slug}&populate=blocks.image,blocks.button,blocks.backgroundColor,blocks.multiBoxSmall.image,blocks.multiBoxSmall.backgroundColor,blocks.multiBoxBig.image,blocks.multiBoxBig.backgroundColor,blocks.settings.backgroundColor,blocks.settings.blockPadding,blocks.textBackgroundColor,blocks.lineColor`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      //cache: 'no-store',
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const json = await res.json();
    return json.data[0] || {};
}

//All content pages
export async function fetchAllContentPages() {
    const res = await fetch(`${API_URL}/api/content-pages`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      //cache: 'no-store',
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const json = await res.json();
    return json.data;
}

// Fetch all product category slugs
/*export async function fetchAllProductCategorySlugs() {
    const res = await fetch(`${API_URL}/api/product-category-pages`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch slugs");
    }
  
    const json = await res.json();
    console.log('Fetched slugs:', json.data); // 👈 log this

    return json.data.map((item: any) => ({
        slug: item?.attributes?.slug, // safer
    }));

}*/
  

// Dynamic Product Category Page Data
export async function fetchDynamicProductCategoryPageData(slug: string) {
    const res = await fetch(
      `${API_URL}/api/product-category-pages?filters[slug][$eq]=${slug}&populate=blocksBeforeProducts.image,blocksBeforeProducts.button,blocksBeforeProducts.backgroundColor,blocksBeforeProducts.multiBoxSmall.image,blocksBeforeProducts.multiBoxSmall.backgroundColor,blocksBeforeProducts.multiBoxBig.image,blocksBeforeProducts.multiBoxBig.backgroundColor,blocksBeforeProducts.settings.backgroundColor,blocksBeforeProducts.settings.blockPadding,blocksBeforeProducts.textBackgroundColor,blocksAfterProducts.image,blocksAfterProducts.button,blocksAfterProducts.backgroundColor,blocksAfterProducts.multiBoxSmall.image,blocksAfterProducts.multiBoxSmall.backgroundColor,blocksAfterProducts.multiBoxBig.image,blocksAfterProducts.multiBoxBig.backgroundColor,blocksAfterProducts.settings.backgroundColor,blocksAfterProducts.settings.blockPadding,blocksAfterProducts.textBackgroundColor,blocksAfterProducts.lineColor,blocksBeforeProducts.lineColor`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        //cache: 'no-store',
        cache: 'force-cache',
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch product category data");
    }
  
    const json = await res.json();
    const data = json.data[0];
  
    return {
      blocksBeforeProducts: data?.blocksBeforeProducts || [],
      blocksAfterProducts: data?.blocksAfterProducts || [],
      category: data?.category || '',
      title: data?.title || "",
      metaDescription: data?.metaDescription || "",
    };
}

//Fetch all product category pages
export async function fetchAllCategoryPages() {
  const res = await fetch(`${API_URL}/api/product-category-pages`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    //cache: 'no-store',
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
}

// Fetch products
export async function fetchProducts() {
    const res = await fetch(`${API_URL}/api/products?populate[imageCoverOrContain][populate]=image`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
        //cache: 'no-store',
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch product data');
    }

    const json = await res.json();
    return json.data || [];
}

// Fetch single Product
export async function fetchSingleProduct(slug: string) {
    const res = await fetch(`${API_URL}/api/products?filters[pdpSlug][$eq]=${slug}&populate[imageCoverOrContain][populate]=image`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
        //cache: 'no-store',
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch product data');
    }

    const json = await res.json();
    return json.data || [];
}
  

// Menu data
export async function fetchMenuData() {
    const res = await fetch(`${API_URL}/api/menus?populate[menuChild]=*&populate[inspirationLink][populate]=image&sort=displayOrder:asc`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
        //cache: 'no-store',
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch menu data');
    }

    const json = await res.json();
    return json.data || [];
}

// Fetch footer data
export async function fetchFooterData() {
    const res = await fetch(`${API_URL}/api/footer`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
        //cache: 'no-store',
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch footer data');
    }

    const json = await res.json();
    return json.data || [];
}
