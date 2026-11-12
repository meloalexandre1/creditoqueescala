import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = {
  accent:"#A7C0FF", background:"#081639", ink:"#F7F9FF", muted:"#D1DAEF"
};
export const scrollScrubScenes: ScrollScrubScene[] = [{
  id:"caminho", label:"O método", clip:"/assets/world/fluxo.mp4",
  poster:"/assets/world/fluxo-poster.png",
  kicker:"Idealizado por Renato Junqueira",
  title:"Método: Crédito que Escala",
  body:"Cresça com estrutura: método, tecnologia e capacitação para decisões financeiras.",
  tags:[], scroll:1.65, objectPosition:"65% 50%"
}];
