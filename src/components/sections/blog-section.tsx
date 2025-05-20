
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Lightbulb } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Why Bharat Needs Crop Planning Now — Not 10 Years Later",
    content: [
      "India grows.",
      "But most of our farmers still guess what to grow.",
      "They plant what they did last year. Or what their neighbor tried. And when 10 villages all sow the same crop, prices crash and debt rises.",
      "This is not a productivity issue. It’s a data vacuum at the grassroots.",
      "At RICE, we believe crop planning should be as easy as checking the weather.",
      "That’s why we’re building a system that connects farmer choices to:",
    ],
    bulletPoints: [
        "Real-time mandi demand",
        "Regional climate risks",
        "B2B buyer interest",
    ],
    conclusion: [
      "Bharat doesn’t need more fertilizer. It needs forecasting + local insight + better decisions — delivered in the farmer’s language.",
      "Because smart planning = smart profits = rural dignity."
    ]
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Why The Next Unicorns May Be Sitting in a Village Right Now",
    content: [
      "We’ve spent years talking about empowering rural India. But who empowers rural entrepreneurs?",
      "At RICE, we believe that change doesn’t come from urban offices. It comes from local champions — women, youth, co-op leaders — who know their land, their people, and their trust networks.",
      "That’s why our model is not centralised or app-only. It’s built around RICE Centers — franchise hubs run by local entrepreneurs who:",
    ],
    bulletPoints: [
        "Onboard farmers",
        "Enable credit",
        "Handle post-harvest logistics",
        "Become the village’s agri nerve center",
    ],
    conclusion: [
      "These franchisees aren’t distributors. They’re rural CEOs — running profitable, impact-driven agri businesses.",
      "The agri revolution won’t come by telling farmers what to do. It will come when farmers and local leaders become co-owners of the solution."
    ]
  },
];

export default function BlogSection() {
  return (
    <section id="blog-insights" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Insights &amp; <span className="text-primary">Perspectives</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing our thoughts on transforming agriculture in Bharat.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <post.icon className="h-8 w-8 text-primary mt-1 shrink-0" />
                  <div>
                    <CardTitle className="text-xl md:text-2xl mb-1">{post.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 text-muted-foreground">
                {post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {post.bulletPoints && post.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    {post.bulletPoints.map((point, idx) => (
                      <li key={idx} className="text-primary"><span className="text-muted-foreground">{point}</span></li>
                    ))}
                  </ul>
                )}
                {post.conclusion && post.conclusion.map((paragraph, index) => (
                  <p key={`conclusion-${index}`} className="mt-4">{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
