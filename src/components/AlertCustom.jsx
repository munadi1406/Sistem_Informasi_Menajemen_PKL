import { Alert } from "@material-tailwind/react";
import { useAlertNotification } from "../store/store";
import { useEffect } from "react";

export function AlertCustom() {
  // const [open, setOpen] = useState(true);
  const { open, status, msg } = useAlertNotification((state) => state)
  const { setOpen ,setMsg} = useAlertNotification()


  useEffect(() => {
    let timeOut; 

    if (open) {
      timeOut = setTimeout(() => {
        setOpen(false);
        setMsg("");
      }, 3000);
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [open]);


  return (
    <>
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="fixed bottom-10 left-10 z-[100] w-[400px] capitalize"
        color={status ? 'green' : 'red'}
      >
        {msg}
      </Alert>
    </>
  );
}