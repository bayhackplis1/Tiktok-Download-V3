import { Button } from "@/components/ui/button";
import { TikTokData } from "@/pages/home";
import { Download, Music, Info, User, Calendar, Eye, Heart, MessageCircle, Share2, FileVideo, Sparkles } from "lucide-react";
import { ProgressIndicator } from "./progress-indicator";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoPreviewProps {
  data: TikTokData;
}

export function VideoPreview({ data }: VideoPreviewProps) {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  async function downloadFile(url: string, type: "video" | "audio") {
    try {
      setDownloadProgress(0);

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadProgress(100);
      setTimeout(() => setDownloadProgress(null), 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadProgress(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="aspect-video relative rounded-xl overflow-hidden bg-muted border-2 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {data.metadata.description && (
        <div className="bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground/90">{data.metadata.description}</p>
        </div>
      )}

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="technical" className="data-[state=active]:bg-primary/20">
            <FileVideo className="h-4 w-4 mr-2" />
            Technical Info
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-secondary/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Social Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="mt-4">
          <div className="bg-muted/30 backdrop-blur-sm p-5 rounded-lg border border-primary/20 space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-primary mb-4">
              <Info className="h-5 w-5" />
              Video Technical Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Duration</p>
                <p className="font-semibold text-foreground">{data.metadata.duration}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Resolution</p>
                <p className="font-semibold text-foreground">{data.metadata.resolution}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Format</p>
                <p className="font-semibold text-foreground">{data.metadata.format}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">FPS</p>
                <p className="font-semibold text-foreground">{data.metadata.fps}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Video Size</p>
                <p className="font-semibold text-foreground">{data.metadata.videoSize}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Audio Size</p>
                <p className="font-semibold text-foreground">{data.metadata.audioSize}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Codec</p>
                <p className="font-semibold text-foreground">{data.metadata.codec}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Bitrate</p>
                <p className="font-semibold text-foreground">{data.metadata.bitrate}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <div className="bg-muted/30 backdrop-blur-sm p-5 rounded-lg border border-secondary/20 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-secondary mb-4">
              <Sparkles className="h-5 w-5" />
              Social Engagement
            </h3>
            
            {data.metadata.author && (
              <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                <User className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">Author:</span>
                <span className="font-semibold text-foreground">{data.metadata.author}</span>
              </div>
            )}

            {data.metadata.uploadDate && (
              <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                <Calendar className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground text-sm">Upload Date:</span>
                <span className="font-semibold text-foreground">{data.metadata.uploadDate}</span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {data.metadata.viewCount && (
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg border border-primary/10">
                  <Eye className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="font-bold text-foreground text-lg">{data.metadata.viewCount}</p>
                </div>
              )}
              {data.metadata.likeCount && (
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg border border-accent/10">
                  <Heart className="h-5 w-5 text-accent mb-2" />
                  <p className="text-xs text-muted-foreground">Likes</p>
                  <p className="font-bold text-foreground text-lg">{data.metadata.likeCount}</p>
                </div>
              )}
              {data.metadata.commentCount && (
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg border border-secondary/10">
                  <MessageCircle className="h-5 w-5 text-secondary mb-2" />
                  <p className="text-xs text-muted-foreground">Comments</p>
                  <p className="font-bold text-foreground text-lg">{data.metadata.commentCount}</p>
                </div>
              )}
              {data.metadata.shareCount && (
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg border border-primary/10">
                  <Share2 className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Shares</p>
                  <p className="font-bold text-foreground text-lg">{data.metadata.shareCount}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {downloadProgress !== null && (
        <ProgressIndicator progress={downloadProgress} />
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => downloadFile(data.videoUrl, "video")}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 font-bold text-lg h-14"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Video
        </Button>
        <Button
          onClick={() => downloadFile(data.audioUrl, "audio")}
          className="flex-1 bg-gradient-to-r from-accent to-secondary text-black hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all duration-300 font-bold text-lg h-14"
        >
          <Music className="mr-2 h-5 w-5" />
          Download Audio
        </Button>
      </div>
    </div>
  );
}

