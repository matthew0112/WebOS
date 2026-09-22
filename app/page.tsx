"use client"

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizeCallbackData } from 'react-resizable';

import { Box, Button, Card, CardContent, IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme";
import 'react-resizable/css/styles.css';
import { CheckBoxOutlineBlank, Close, Minimize, Remove } from "@mui/icons-material";

export default function Home() {
  const nodeRef = useRef(null);

  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setTimeString(date.toLocaleTimeString());
      setDateString(date.toLocaleDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onResize = (e: SyntheticEvent<Element, Event>, { size }: ResizeCallbackData) => {
    setDimensions({ width: size.width, height: size.height });
  };

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

        {/* Placeholder App */}
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
                  <Typography variant="caption" sx={{ fontWeight: 'bold'}}>Title</Typography>
                  <Stack direction="row">
                    <IconButton size="small"><Remove fontSize="small"/></IconButton>
                    <IconButton size="small"><CheckBoxOutlineBlank fontSize="small"/></IconButton>
                    <IconButton size="small"><Close fontSize="small"/></IconButton>
                  </Stack>
                </Stack>

                <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <Typography>
                    Content
                  </Typography>
                </CardContent>
              </Card>
            </Resizable>
          </Box>
        </Draggable>


        {/* Bottom Nav Bar */}
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
