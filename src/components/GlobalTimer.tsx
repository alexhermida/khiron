import { useState } from "react";
import { Button, Drawer, ProgressBar } from "@heroui/react";
import { Link } from "react-router-dom";
import { useWorkTimer } from "../context/useWorkTimer";
import { PauseIcon, PlayIcon, RefreshIcon, TimerIcon } from "./Icons";

export default function GlobalTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useWorkTimer();

  return (
    <>
      <div className="hidden lg:block">
        <Button variant="secondary" aria-label={`Abrir temporizador, ${timer.display}`} onPress={() => setIsOpen(true)} className="shadow-sm">
          <span className={`size-2 rounded-full ${timer.isRunning ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
          <TimerIcon className="size-4" />
          <span className="font-semibold tabular-nums">{timer.display}</span>
        </Button>
      </div>

      <div className="fixed inset-x-3 z-30 rounded-2xl border border-border/70 bg-surface/95 p-2 shadow-lg backdrop-blur-xl lg:hidden" style={{ bottom: "calc(4.5rem + env(safe-area-inset-bottom))" }}>
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Button isIconOnly variant="ghost" aria-label="Abrir temporizador" onPress={() => setIsOpen(true)}>
            <TimerIcon className="size-5 text-accent" />
          </Button>
          <button type="button" className="min-h-10 min-w-0 flex-1 rounded-lg px-1 text-left focus-visible:outline-2 focus-visible:outline-accent" onClick={() => setIsOpen(true)}>
            <span className="block text-xs font-medium text-muted">Pausa activa</span>
            <span className="block text-lg font-bold leading-none tabular-nums text-foreground">{timer.display}</span>
          </button>
          <Button size="sm" variant={timer.isRunning ? "secondary" : "primary"} onPress={timer.toggle} aria-label={timer.isRunning ? "Pausar temporizador" : "Iniciar temporizador"}>
            {timer.isRunning ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
            {timer.isRunning ? "Pausar" : "Iniciar"}
          </Button>
        </div>
      </div>

      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant="blur">
        <Drawer.Content placement="bottom">
          <Drawer.Dialog className="overscroll-contain">
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Temporizador de trabajo</Drawer.Heading>
              <p className="text-sm text-muted">50 minutos de trabajo antes de tu próxima pausa activa.</p>
            </Drawer.Header>
            <Drawer.Body>
              <div className="mx-auto w-full max-w-lg py-4 text-center">
                <p className="text-6xl font-black tracking-tight tabular-nums text-foreground" aria-label={`${timer.display} restantes`}>{timer.display}</p>
                <p className="mt-2 text-sm text-muted">{timer.isRunning ? "En marcha" : timer.progress > 0 ? "En pausa" : "Preparado"}</p>
                <ProgressBar aria-label="Progreso hasta la pausa activa" className="mt-6" value={timer.progress}>
                  <ProgressBar.Track>
                    <ProgressBar.Fill />
                  </ProgressBar.Track>
                </ProgressBar>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant={timer.isRunning ? "secondary" : "primary"} onPress={timer.toggle}>
                    {timer.isRunning ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
                    {timer.isRunning ? "Pausar" : "Iniciar turno"}
                  </Button>
                  <Button variant="tertiary" onPress={timer.reset}>
                    <RefreshIcon className="size-4" />
                    Reiniciar
                  </Button>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Link to="/work" onClick={() => setIsOpen(false)} className="flex min-h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Ver rutina de Trabajo
              </Link>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
}
