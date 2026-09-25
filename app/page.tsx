"use client"

import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizeCallbackData } from 'react-resizable';
import dynamic from "next/dynamic";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from "@mui/material/styles";
import Typography from '@mui/material/Typography';

import CalculateIcon from '@mui/icons-material/Calculate';
import MapIcon from '@mui/icons-material/Map';
import 'react-resizable/css/styles.css';
import Remove from "@mui/icons-material/Remove";
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import Close from '@mui/icons-material/Close';

import { v4 as uuidv4 } from 'uuid';
import Calculator from "./apps/calculator";
import theme from "./theme";
const OSMMap = dynamic(() => import("./apps/maps"), { ssr: false });

type APPS = { title: string, icon: ReactNode, content: ReactNode }[]

const AVAILABLE_APPS: APPS = [
  { title: "Calculator", icon: <CalculateIcon />, content: <Calculator /> },
  { title: "Maps", icon: <MapIcon />, content: <OSMMap /> }
]

export default function Home() {
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  const [openApps, setOpenApps] = useState<{ id: string, title: string, icon: ReactNode, content: ReactNode }[]>([]);

  const isOffline = useOffline();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setTimeString(date.toLocaleTimeString());
      setDateString(date.toLocaleDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url("/Wallpaper.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100dvw',
          height: '100dvh',
          overflow: "hidden",
        }}
      >
        {/* OPEN APPS */}
        {openApps.map((value) => (
          <App key={value.id} title={value.title} icon={value.icon} content={value.content} onClose={() => setOpenApps(openApps.filter(item => item.id !== value.id))} />
        ))}

        {/* NAVIGATION BAR */}
        <Paper
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100dvw",
            p: 2,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Stack direction="row">
            {AVAILABLE_APPS.map((app) => (
              <IconButton key={app.title} onClick={() => setOpenApps(items => [...items, { ...app, id: uuidv4() }])}>{app.icon}</IconButton>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            {isOffline ? (
              <WifiOffIcon />
            ) : (
              <WifiIcon />
            )}
            <Stack sx={{ alignItems: "center" }}>
              <Typography>{timeString}</Typography>
              <Typography>{dateString}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

function App({ title, icon, content, onClose }: { title: string, icon: ReactNode, content: ReactNode, onClose: () => void }) {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const onResize = (e: SyntheticEvent<Element, Event>, { size }: ResizeCallbackData) => {
    setDimensions({ width: size.width, height: size.height });
  };

  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <Box ref={nodeRef} sx={{ position: 'relative', display: 'inline-block', width: dimensions.width, height: dimensions.height }}>
        <Resizable width={dimensions.width} height={dimensions.height} onResize={onResize} minConstraints={[250, 250]}>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none'
            }}
          >
            <Stack
              direction={"row"}
              className="drag-handle"
              sx={{
                p: 1,
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' },
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {icon}
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{title}</Typography>
              </Stack>
              <Stack direction="row">
                <IconButton size="small"><Remove fontSize="small" /></IconButton>
                <IconButton size="small"><CheckBoxOutlineBlank fontSize="small" /></IconButton>
                <IconButton size="small" onClick={onClose}><Close fontSize="small" /></IconButton>
              </Stack>
            </Stack>

            <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
              {content}
            </CardContent>
          </Card>
        </Resizable>
      </Box>
    </Draggable>
  )
}

export function useOffline() {
  // navigator.onLine returns true if online, false if offline
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Listen for network connectivity changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOffline;
}