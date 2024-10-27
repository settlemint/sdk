import CollapsedBreadcrumbs from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb";

type PageProps = {
  params: Promise<{
    catchAll: string[];
  }>;
};

export default async function Breadcrumbs({ params }: PageProps) {
  const { catchAll } = await params;
  return <CollapsedBreadcrumbs routeSegments={catchAll} />;
}
