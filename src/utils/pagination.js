'use strict'

const pagination = {
  config: (perPage = 1, currentPage = 1) => {
    currentPage = Number(currentPage)
    if (typeof currentPage === 'number' && isNaN(currentPage) === false) {
      currentPage = currentPage <= 1 ? 1 : currentPage
    } else {
      currentPage = 1
    }
    const offset = currentPage === 1 ? 0 : currentPage * perPage - perPage
    return { perPage, currentPage, offset }
  },

  paginationCover: (url, querySearch, total, perPage, currentPage) => {
    const totalPage = Math.ceil(total / perPage)
    const originalUrl = url.split(/[?&]page/)[0]
    const urlPage =
      originalUrl.includes('?category=') || originalUrl.includes('?id=')
        ? `${originalUrl}&page=`
        : `${originalUrl}?page=`

    // If the current page is more than the total page then go back to the total page
    if (totalPage < currentPage && totalPage > 0 && currentPage > 1) {
      return {
        checked: true,
        urlRedirect: totalPage === 1 ? originalUrl : urlPage + totalPage,
      }
    }

    if (totalPage <= 1) {
      return { checked: false, html: '' }
    }

    let i = currentPage > 3 ? currentPage - 2 : 1
    // Fist Item
    let html = `
        <nav>
          <ul class="pagination pagination-sm mb-0 mt-3 justify-content-end">
            <li class="page-item">
              <a class="page-link ${currentPage === 1 ? 'disabled' : ''}" aria-label="Previous"
                  ${currentPage === 1 ? '' : `href="${originalUrl}"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                  <path d="M0.827131 10.5488L10.0777 19.7738C10.3808 20.0759 10.8715 20.0754 11.1741 19.7723C11.4764 19.4692 11.4756 18.9782 11.1725 18.6759L2.47255 9.99996L11.1728 1.32406C11.4759 1.02172 11.4767 0.531057 11.1744 0.227934C11.0227 0.0759811 10.824 3.76429e-06 10.6253 3.74691e-06C10.4271 3.72959e-06 10.2292 0.0754737 10.0778 0.226372L0.827131 9.45114C0.681155 9.59637 0.599241 9.79403 0.599241 9.99996C0.599241 10.2059 0.68139 10.4033 0.827131 10.5488Z" fill="#9D9D9D"></path>
                </svg>
              </a>
            </li> `
    if (i !== 1) {
      html += ` <li class="page-item disabled">
                  <span class="page-link">
                    <span aria-hidden="true">...</span>
                  </span>
                </li> `
    }
    // List Item
    for (; i <= currentPage + 2 && i <= totalPage; i++) {
      html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" ${
            currentPage === i ? '' : `href="${i === 1 ? originalUrl : urlPage + i}"`
          }> ${i} </a>
        </li> `
      if (i === currentPage + 2 && i < totalPage) {
        html += ` <li class="page-item disabled">
                    <span class="page-link">
                      <span aria-hidden="true">...</span>
                    </span>
                  </li> `
      }
    }
    // Last Item
    html += `
        <li class="page-item">
          <a class="page-link ${currentPage === totalPage ? 'disabled' : ''}" aria-label="Next"
            ${currentPage === totalPage ? '' : `href="${urlPage + totalPage}"`} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none">
              <path
                d="M11.1729 9.45117L1.92228 0.226167C1.6192 -0.0759023 1.12849 -0.0753945 0.825918 0.227729C0.523575 0.530814 0.524357 1.02179 0.827481 1.32409L9.52745 10L0.827168 18.6759C0.524083 18.9783 0.523302 19.4689 0.825605 19.7721C0.977285 19.924 1.17599 20 1.37471 20C1.57291 20 1.77084 19.9245 1.92224 19.7736L11.1729 10.5489C11.3188 10.4036 11.4008 10.206 11.4008 10C11.4008 9.7941 11.3186 9.59668 11.1729 9.45117Z"
                fill="#9D9D9D" />
            </svg>
          </a>
        </li> </ul> </nav> `

    return { checked: false, html }
  },
}

module.exports = pagination
