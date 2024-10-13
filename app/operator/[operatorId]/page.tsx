import type { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: { operatorId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getOperatorData = cache(async (operatorId: string) => {
  const response = await fetch(
    `https://api.stage.ops.ssvlabsinternal.com/api/v4/holesky/operators/${operatorId}`
  );
  console.log("fetched");
  if (!response.ok) {
    throw new Error("Failed to fetch operator data");
  }
  return response.json();
});

// This function will be used by both generateMetadata and Page
const getOperator = cache(async (operatorId: string) => {
  return getOperatorData(operatorId);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const operator = await getOperator(params.operatorId);

  const title = `SSV Operator: ${operator.name}` || "SSV Operator Not Found";
  const description = `View details for SSV Operator ${
    operator.name
  }. Performance: ${operator.performance["30d"].toFixed(2)}%, Fee: ${
    operator.fee
  }%`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: operator.logo_url || "https://picsum.photos/1200/630", // Fallback to a default SSV image
          width: 1200,
          height: 630,
          alt: `${operator.name} - SSV Operator`,
        },
      ],
      type: "website",
      siteName: "SSV Explorer",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [operator.logo_url || "https://picsum.photos/1200/630"], // Fallback to a default SSV image
    },
  };
}

export default async function Page({ params }: Props) {
  const operator = await getOperator(params.operatorId);

  return <pre>{JSON.stringify(operator, null, 2)}</pre>;
}
