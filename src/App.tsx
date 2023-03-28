import React, { useState, useEffect } from "react";
import rutgers from './assets/rutgers.png';
import { getLinkHubInfo } from "./utils";

interface Link {
  url: string;
  title: string;
}

interface Organization {
  name: string;
  links: Link[];
  organization_activated_link_hub: boolean;
}

async function fakeFetch(): Promise<Organization> {
  await Promise.resolve({
    json: () => Promise.resolve({ test: 2000 })
  });

  const organization: Organization = {
    name: "Zimmerli Art Museum",
    // motto: "So Much to Discover.",
    links: [
      {
        url: "https://zimmerli.rutgers.edu/",
        title: "Home"
      },
      {
        url: "",
        title: "Volunteering"
      },
      {
        url: "",
        title: "Donations"
      },
      {
        url: "",
        title: "Connect!"
      }
    ],
    organization_activated_link_hub: false,
  };

  return organization;
}


function Links(props: { links: Link[] }) {
  const { links } = props;
  return (
    <div className="w-full flex flex-col items-center mt-10">
      {links.map((link, index) => {
        return (
          <button
            className="bg-red-400 w-full m-4 flex justify-center rounded-lg max-w-xl
                       text-white p-4
                      hover:bg-red-500 hover:cursor-pointer transition-colors"
            key={index}
            onClick={() => {
              window.open(link.url, "_blank");
            }}
          >
            <div className="font-bold">{link.title}</div>
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    getLinkHubInfo().then((org) => {
      setOrganization(org);
    });
  }, []);

  if (!organization) {
    return <div>Loading...</div>;
  }

  const { name, links } = organization;

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-10 p-3">
        <img src={rutgers} className="h-12" />
      </div>
      <div className="p-10 mt-10">
        <div className="w-full flex flex-col items-center">
          <div className="text-5xl font-semibold text-center">{name}</div>
          {/* <div className="text-2xl text-gray-600 p-2">{motto}</div> */}
        </div>

        <Links links={links} />
      </div >
    </div>
  );
}
