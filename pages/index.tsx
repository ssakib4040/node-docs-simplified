// pages/index.tsx
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

interface Module {
  name: string;
  desc?: string;
  methods?: any[];
  classes?: any[];
  properties?: any[];
  events?: any[];
  textRaw?: string;
}

interface HomeProps {
  modules: Module[];
}

export default function Home({ modules }: HomeProps) {
  // console.log("transformedData", transformedData);
  return (
    <div className="container py-4">
      <Head>
        <title>Node.js API Docs</title>
      </Head>
      <h1 className="mb-4">Node.js API Documentation</h1>
      <ul>
        {modules.map((mod) => (
          <li key={mod.name}>
            <Link
              href={`/module/${mod.name}`}
              className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
            >
              {mod.textRaw ?? ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "all.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContent);

  const transformedData = json.modules.map((mod: Module) => {
    const { name, textRaw } = mod;

    return {
      textRaw: textRaw,
      name: name,
    };
  });

  return {
    props: { modules: transformedData },
  };
};
