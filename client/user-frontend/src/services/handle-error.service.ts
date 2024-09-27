/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { IErrorResponse } from '@/types/error'
import { ToastService } from './toast.service'
import { useRouter } from 'next/navigation'

export class HandleErrorService {
  constructor(
    private router = useRouter(),
    private toastService = new ToastService()
  ) {}

  handleHttpError(error: IErrorResponse): void {
    switch (error.statusCode) {
      case 400:
        this.toastService.error(error.message)
        break
      case 401:
        this.toastService.error(error.message)
        this.router.push('/sign-in')
        break
      case 403:
        this.toastService.error(error.message)
        break
      case 404:
        this.toastService.error(error.message)
        break
      case 409:
        this.toastService.error(error.message)
        break
      case 500:
        this.toastService.error(error.message)
        break
      default:
        this.toastService.error(error.message)
        break
    }
  }
}
