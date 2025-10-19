import { Card, CardContent } from "@/components/ui/card";
import { DownloadForm } from "@/components/download-form";
import { VideoPreview } from "@/components/video-preview";
import { MatrixRain } from "@/components/matrix-rain";
import { useState } from "react";

export interface TikTokMetadata {
  duration: string;
  videoSize: string;
  audioSize: string;
  resolution: string;
  format: string;
  codec: string;
  fps: number;
  bitrate: string;
  uploadDate?: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  shareCount?: string;
  author?: string;
  description?: string;
}

export interface TikTokData {
  videoUrl: string;
  audioUrl: string;
  thumbnail: string;
  title: string;
  metadata: TikTokMetadata;
}

export default function Home() {
  const [previewData, setPreviewData] = useState<TikTokData | null>(null);

  return (
    <>
      <MatrixRain />
      <div className="scan-effect" />
      <div className="min-h-screen w-full p-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 mt-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent cyber-glow mb-4 glitch">
              TIKTOK DOWNLOADER
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary via-secondary to-accent mb-4 animate-pulse" />
            <p className="text-muted-foreground text-lg">
              Extract • Download • Dominate
            </p>
          </div>

          <Card className="mb-8 bg-card/40 backdrop-blur-xl border-primary/30 shadow-[0_0_30px_rgba(0,255,255,0.3)] hologram-effect">
            <CardContent className="pt-6">
              <DownloadForm onPreview={setPreviewData} />
            </CardContent>
          </Card>

          {previewData && (
            <Card className="bg-card/40 backdrop-blur-xl border-primary/30 shadow-[0_0_30px_rgba(0,255,255,0.3)] hologram-effect">
              <CardContent className="pt-6">
                <VideoPreview data={previewData} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
