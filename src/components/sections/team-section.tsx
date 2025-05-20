
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  line: string;
  avatarUrl?: string;
  initials: string;
}

const coreTeamMembers: TeamMember[] = [
  { name: "Premchand Yadav", role: "Founder & CEO", line: "Student Founder,Futuristic Technocrat, bold vision", avatarUrl: "https://i.postimg.cc/Kztrs6nc/premphoto1-removebg-preview.png", initials: "PY" },
  { name: "Kiran Kumar Reddy", role: "COO", line: "Ops, finance, agri networks expert", avatarUrl: "https://i.postimg.cc/ncWzYcdf/image.png", initials: "KR" },
  { name: "Stephen", role: "Tech Lead", line: "Backend & mobile systems builder", avatarUrl: "https://i.postimg.cc/CL4bLY5y/Whats-App-Image-2025-05-20-at-16-28-23-deeb7ad2.jpg", initials: "S" },
  { name: "SriHarsha Vardhan", role: "UI/UX Lead", line: "Vernacular-first designer", avatarUrl: "https://i.postimg.cc/BQpW4LGx/harsha1.jpg", initials: "SV" },
  { name: "Praneeth", role: "Marketing", line: "Rural-urban outreach & GTM expert", avatarUrl: "https://i.postimg.cc/VsqTTTRV/praneeth.jpg", initials: "P" },
];

const mentorMember: TeamMember = { name: "Karthik Barma", role: "Mentor", line: "Serial founder, innovation advisor", avatarUrl: "https://i.postimg.cc/C5DV6H7p/karthik.jpg", initials: "KB" };

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Meet the <span className="text-primary">Driving Force</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate team dedicated to revolutionizing agriculture for small farmers in India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreTeamMembers.map((member) => (
            <Card key={member.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={member.avatarUrl || `https://placehold.co/100x100.png`} alt={member.name} data-ai-hint="profile person" />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">{member.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">{member.line}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-8">
            Our <span className="text-primary">Mentor</span>
          </h3>
          <div className="flex justify-center">
            <Card key={mentorMember.name} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-sm border-2 border-accent/50 bg-background">
              <CardHeader className="items-center text-center">
                <Avatar className="w-28 h-28 mb-4 border-2 border-accent">
                  <AvatarImage src={mentorMember.avatarUrl || `https://placehold.co/120x120.png`} alt={mentorMember.name} data-ai-hint="profile person mentor" />
                  <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{mentorMember.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{mentorMember.name}</CardTitle>
                <CardDescription className="text-accent font-semibold text-lg">{mentorMember.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base text-muted-foreground">{mentorMember.line}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
