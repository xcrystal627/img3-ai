import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="max-h-256 w-full flex-none border-t border-gray-100">
      <div className="mx-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-full hidden lg:col-span-1 lg:block">
            <Link
              href="#"
              className="flex-none text-lg font-semibold text-gray-900"
              aria-label="Brand"
            >
              見積もり上手の齋藤さん
            </Link>
            <p className="mt-3 text-xs text-gray-400 sm:text-sm">
              © 2022 IME3, Inc.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-900">
              Product
            </h4>
            <div className="mt-3 grid space-y-3 text-sm">
              <Link
                href="/contact"
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-900">
              Company
            </h4>
            <div className="mt-3 grid space-y-3 text-sm">
              <Link
                href="https://www.ime-3.com"
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                target="_blank"
              >
                ホームページ
              </Link>
              <Link
                href="https://www.ime-3.com/achievements"
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                target="_blank"
              >
                過去の実績
              </Link>
              <Link
                href="https://www.ime-3.com/about"
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                target="_blank"
              >
                会社概要
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
