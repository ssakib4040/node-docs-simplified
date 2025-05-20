// pages/module/[name].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

interface Method {
  name: string;
  textRaw?: string;
  desc?: string;
}

interface ModulePageProps {
  module: {
    name: string;
    desc?: string;
    methods?: Method[];
    classes?: any[];
    properties?: any[];
    events?: any[];
  };
}

export default function ModulePage({ module }: ModulePageProps) {
  const router = useRouter();

  return (
    <div className="container py-5">
      <Head>
        <title>{module.name} | Node.js Docs</title>
      </Head>
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>

      <div className="mb-4">
        <h2 className="mb-2">{module.name}</h2>
        <p className="text-muted">
          {module.desc
            ? module.desc.replace(/<[^>]*>?/gm, "")
            : "No description available."}
        </p>
      </div>

      {module.methods && module.methods.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-3">Methods</h4>
          <div className="accordion" id="methodsAccordion">
            {module.methods.map((method, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded="false"
                    aria-controls={`collapse${idx}`}
                  >
                    {method.name}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#methodsAccordion"
                >
                  <div className="accordion-body text-muted">
                    {method.textRaw ||
                      method.desc?.replace(/<[^>]*>?/gm, "") ||
                      "No description"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Future: Classes, Properties, Events */}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "all.json");
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const paths = json.modules.map((m: any) => ({ params: { name: m.name } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "all.json");
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const module = json.modules.find((m: any) => m.name === params?.name);

  return {
    props: { module },
  };
};
