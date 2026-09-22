"use client"

import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizeCallbackData } from 'react-resizable';

import { Box, Card, CardContent, IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';
import theme from "./theme";
import 'react-resizable/css/styles.css';
import { CheckBoxOutlineBlank, Close, Remove } from "@mui/icons-material";

import { v4 as uuidv4 } from 'uuid';

type APPS = { title: string, icon: ReactNode, content: ReactNode }[]

const AVAILABLE_APPS: APPS = [
  {title: "Calculator", icon: <CalculateIcon />, content: <Typography>1 + 1 = 2</Typography>}
]

export default function Home() {
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  const [openApps, setOpenApps] = useState<{ id: string, title: string, icon: ReactNode, content: ReactNode }[]>([])

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
          <App key={value.id} title={value.title} icon={value.icon} content={value.content} onClose={() => setOpenApps(openApps.filter(item => item.id !== value.id ))} />
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
              <IconButton key={app.title} onClick={() => setOpenApps(items => [...items, {...app, id: uuidv4()}])}>{app.icon}</IconButton>
            ))}
          </Stack>
          <Stack sx={{ alignItems: "center" }}>
            <Typography>{timeString}</Typography>
            <Typography>{dateString}</Typography>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

function App({ title, icon, content, onClose }: { title: string, icon: ReactNode, content: ReactNode, onClose: () => void}) {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  const onResize = (e: SyntheticEvent<Element, Event>, { size }: ResizeCallbackData) => {
    setDimensions({ width: size.width, height: size.height });
  };

  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <Box ref={nodeRef} sx={{ position: 'relative', display: 'inline-block', width: dimensions.width, height: dimensions.height }}>
        <Resizable width={dimensions.width} height={dimensions.height} onResize={onResize} minConstraints={[200, 150]}>
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