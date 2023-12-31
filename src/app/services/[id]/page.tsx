import { api } from "@/trpc/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/Tabs";
import Comments from "./Comments";

interface Props {
    title: string;
    data: string[];
}

const List = ({ title, data }: Props) => {
    return (
        data.length > 0 && (
            <section className="mt-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <ul className="mt-2 list-inside list-disc">
                        {data.map((item) => (
                            <li className="text-foreground/85 first-letter:uppercase" key={item}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        )
    );
};

const Page = async ({ params }: any) => {
    const service = await api.service.getService.query({ id: params.id });
    if (!service)
        return (
            <section>
                <h1 className="mb-4 text-3xl font-bold">Service not found</h1>
                <p>Looks like service you are looking for does not exist.</p>
            </section>
        );
    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">{service.name}</h1>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="preparations">Preparations</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="max-w-4xl">
                    <p className="text-foreground/85">{service.descriptionFull || service.description}</p>
                    <List title="Researches" data={service.researches} />
                    <List title="Materials" data={service.materials} />
                </TabsContent>
                <TabsContent value="preparations" className="max-w-4xl">
                    <List title="Preparations" data={service.preparations} />
                </TabsContent>
                <TabsContent value="comments">
                    <Comments id={params.id} />
                </TabsContent>
            </Tabs>
        </section>
    );
};
export default Page;
