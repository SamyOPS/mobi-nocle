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
      <div className="bg-lens-light pt-10 pb-4 sm:pt-12">
        <Container>
          <h1 className="max-w-4xl text-3xl text-ink sm:text-4xl">{frTypo(title)}</h1>
          {intro ? <div className="mt-4 max-w-3xl text-lg sm:text-xl">{intro}</div> : null}
        </Container>
      </div>
      <ArcDivider from="lens-light" to="white" />
    </>
  );
}
