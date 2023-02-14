import React, { useState, useEffect } from "react";

interface Link {
  url: string;
  index: number;
}

interface Organization {
  organizationName: string;
  links: Link[];
  motto: string;
}

async function fakeFetch(): Promise<Organization> {
  await Promise.resolve({
    json: () => Promise.resolve({ test: 100 })
  });

  const organization: Organization = {
    organizationName: "StateFarm",
    motto: "We. Are. Farmers.",
    links: [
      {
        url: "",
        index: 0
      }
    ]
  };

  return organization;
}

function Links(props: { links: Link[] }) {
  const { links } = props;
  return (
    <div>
      {links.map((link) => {
        return (
          <div className="bg-gray-300" key={link.index}>
            Link
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    fakeFetch().then((org) => {
      setOrganization(org);
    });
  }, []);

  if (!organization) {
    return <div>Loading...</div>;
  }

  const { organizationName, motto, links } = organization;

  return (
    <div className="w-screen h-screen bg-gray-200 p-15">
      <div className="w-full flex flex-col items-center">
        <div className="text-5xl font-semibold">{organizationName}</div>
        <div className="text-2xl">{motto}</div>
      </div>
      <Links links={links} />
    </div>
  );
}
