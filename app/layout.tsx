import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Teyvat — The Historical Archive',description:'A bilingual, source-based archive of the people, places, and intertwined histories of Teyvat.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
