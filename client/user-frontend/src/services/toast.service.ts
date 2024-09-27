/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
export class ToastService {
  constructor(private router = useRouter()) {}

  success(message: string): void {
    toast.success(message)
  }

  error(message: string): void {
    toast.error(message)
  }

  warning(message: string): void {
    toast.warning(message)
  }

  info(message: string): void {
    toast.info(message)
  }
}
