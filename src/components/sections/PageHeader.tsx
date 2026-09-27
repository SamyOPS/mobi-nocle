import { frTypo } from "@/lib/typo";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  intro?: React.ReactNode;
};

/** En-tête des pages intérieures : titre principal (h1) et introduction. */
export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <>
      <div className="bg-lens-light pt-12 pb-6 sm:pt-16">
        <Container>
          <h1 className="max-w-4xl text-4xl text-ink sm:text-5xl">{frTypo(title)}</h1>
          {intro ? <div className="mt-5 max-w-3xl text-xl sm:text-2xl">{intro}</div> : null}
        </Container>
      </div>
      <ArcDivider from="lens-light" to="white" />
    </>
  );
}
