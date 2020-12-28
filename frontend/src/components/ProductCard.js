import { Link } from 'react-router-dom'

import { formatPrice } from '../utils/formatters'
import urlize from '../utils/urlize'
import Rating from './Rating'

export default function ProductCard({product}) {
  const link = `/products/${product.id}/${urlize(product.name)}`
  return (
    <div key={product.id} className='card'>
      <Link to={link}>
        <img className='medium' src={
          product.images[0] ? product.images[0].url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAD7+/toaGhCQkJISEhLS0tubm7f39/8/Pz29vbx8fHk5OTGxsb4+PicnJzr6+s8PDyDg4PU1NTOzs6urq6MjIxSUlJdXV2ioqJYWFiVlZW1tbW8vLx4eHioqKgsLCwXFxczMzMQEBAdHR0oKCh0dHQbGxt/f3+TjiA4AAAJ40lEQVR4nO2daXuyOhCGXeqCKAXRutWN6tv+/194am11ksxkARLIufJ8fI8ccpcwSWaj0wkKCgoKCgoKCgoKCrKsZPHaH7y0VYP+bpFU4pu8Zt22K3udlAdctJ/vpiIvC3hseujaei8H+Nr0uA20LAO4aHrURlqYA0bXpgdtpCwyJvTnJbzLeJ5OXpoesqlMCcdND9hYY0NCnwzpXUdDwn9ND9hYc0PCftMDNta/aoSn4aBtGl7YIY4qEb51eq1T1BvVR5hV2L1bVFwf4bBnZYSVVSNhtVOmLUWBUKpA2AYFQrkCYRsUCOUKhG1QIJSracJePJ1OU/l9PSaM9/NtcTl/FqvDMqV/5i3h9MCMvD+jfugpYcqea296ISIvfhK+fwqA33pFf+sl4Q7juw0/Rn7sIyEF2O2ukSF4SLghAb8RxZ/7R7iXAN78fby8I5ycpIRiYMI7wjc5YHfLhwh9I+wpAMU4r2+EtB19PETuCs8Ie+rMlg/uTfSMcKoEFJJKPCPUyRvos5d4RjjXIMzYSzwj1AnJXtgYmF+Eva0G4Sd7HPaLMNEhPE+Za/wijNb/92eolfxxZS/xjFC1K71pwF7iGaH86HQXlzLjGSGbdoCL87p5RthRm5qC8536Rqiepnxel2+EnQ8V4ZS7wDvCd8NH6B9hZyUnFAbhH2HM5eKxEl37/hF2cgkgkiDrIWFnRgJikQsfCTs5YVDRTHwvCTsT7CR8wrPU/ST8nqlDno/KUfeVsNObjZ7+/fN2iQXWfuQt4bfSxeawXm1Hu5msisJnQj0FQrkCYRsUCOUKhG1QIJQrELZBgVCu6oTj/XFGbpprUbOEvfntLFuUbOegp0YJe3/Xm9Yfm6hJwuTpGCQzfKurQUKmXQHvqa5PzREmBbz4as3cNEYYc9lNW1trTVOEKfMEb/oyvLeuGiIcIx5PMfm1FjVDiLt0TVurRO/DIpurbFQjhJTP2qxX1Z9bWLHSNEG4oKKcZ0lxj6hHUYkcsQFCSaA6M3iVQQhKiuieUBrEFbK0acGiBBmic0JFlFp/zYCVTx+SN9g14VIOaGBQmaqEM21RHRNq5Pjq9lRjr7qSRsotoTrTvqu7ZvAZ3xcK0SmhFmC30DpnCKHugti7uyTUA+x2Vzq3Fuu7CtwOOyTUyZy8qy//H/0IyWkfoojuCE06n+2Ud46wxKEVhuiMUCd/+Smlbyo5Y5dtkUZOjgjR5AmZVGsGkWjaWIVlbPYEv3VRNDik+qaKHeecECaKbDtMhbxzGFkq20huYqwo+8Q1lN75i7yugQzatBSgoomjZNpz3hD7hNPSzbA39I15Tx0jdq2xTlj2Cd60J28sr0Nkzie2CXVKImmRBlWWY9pll1PLhFXb8FKecNUpDCDaJazc7XtI9NOkTemvnhPcKiGdzKutA35jdZXeY1Nkk1CnSEkpdBOuUdL9OEhbJFRVRmgKWzPGaH8aTgvbhEqfk64QV6HW+31Z2CWssR+96IHRmx7XsU3COnuZiw2KCXfBOVsf3navr7v5aPWz0UjtEep7LHQkeMLFs8r1sFxwi+d0tvkX2SKsF1BcM7jCoP7Rdb+2ugH5YhjmgD88pvJgx3gO1pZ6CJUbjhJiDCowpf2FRiwn3j8YayG002wfbsIfprSv/TGHP8Y6CHXaHpQQ9Nr/upbXRh+r2F/rITT3Oelq0GNve6JPj7iitzoIY0tP8KanJ/y21qH99RTKB5UJY77eqlY9HDDdsl+nSuZ8Fykzwmhi+dtIv1jjbmb6uZiHTD9NxhCuq7hk9HTfS29kwaneJJ7U+JEGhrCw/2mky88jiFGXV5Tmx6/1MCuKIhuuD8dcsREoQehCGRUGHe/WfI33Zb0bV4Z0Tsi3ZrlrcqSmz2BTMeXRPSFSrj0+SC/4qpSc655QCA+n6gZnc6NksoYJhXDNUsd+X0t9+LARwgs342LdAYzKfsfINSHnlFL49qHOJasBHBNyvlMzZ1e5mg63hFzCjG56zp/wdt+tImSzF8xdJWUQnRKyCwUayN/u9rNFvpjtd+gprsREdUnIJliKPuHTjj035DtxITFHdEnIhOcFt/52Lx4okv2A/5nx53IdEjLZlWIYH3/HEn5DcG4xIZOZIX77gUpr4D8TQcQj20AIHyEaeaUyN7hV03Dld0cIs7kivF6DMiPsO2v4HUp3hPBPT8W1qMfDVrCYrYruCMFN6YZtlKVkZrVZpaMzQmgg6NAk344dv0SSatUgIZiAsVC5+NQHdZ5ntjhtJLyAmQUzPD75zemVsCMpfBVNwgGuCKGDFD6OjZDQTtWGwXmqkyjvmhAcDNMz+PeOmCC/whGZuW3gMXZFCIwknKQbbAxr3EcKH6JB0MMR4RnYSPDMfr02fDQIn4Qp+IXBB9YdEb4AQwNMxi9KwiPie0/wpxno72scEYIagwn457/JlvIeb3TbAnO09B2ojgjBQ4GbzMfiN+V3OZh/FCZw6MfYHBGCwy84KYC5JmQiY4jgz6B/1ndECPZZwCTCgLXgOUXMJcgw0G9u4IgQDBes8IxFFI6M4kED7H/0z8GOCME2C1hE1j8spOsK7xrwzunnKzginKF35M4IPKJw0ADGVH/f1iZCIWX3NCX/e+sIwSwFjiVh1eMPGlxIHJjh1s1SYPtBvFc0iHzKIPvlJxDnEGv4KCFePRsC81FuEPm/OJMfBIyU/sa0/kRSVOBpAYOIlcTyWXWwphR4kfUdGTWUjOgITCpgMdEeA/wu/HkpzBXWd5rGVKeZegUmG9yfYbtLodbkMSHRHa1aNtKBRUGjiA2e+aPzEac/kwveKBOHYtp1Ibh4g2mYoad54qAxAW4MoxRM01BzOYH3BoYhcKeZ0EfsZ1sLTYaRx9RW0jMrYEzhKYIohhYOGrc/ELSyZllSZSrRjQWz2aDTjHDjI7twaGcKI8BvK+xg2YdNwKDT7IUYk1BVFsNosHnGwsx65ix846bwNaPeKGnhXIk0t2h/eLG7MkKnN+MDpjwukmwiE5c3UDwdWxW4FWNIMuqB0BtK01TvBsS8+NjuVPwVENL+pHViPWto1vBNxNGudJq/S7EzMCOWtwRFVLcvaoMi1nifiKPCBKlvKcommjoWf2r7wsediOFiD8zMXfx2+APPcxYMqqU+tzYkdg574x9PLi4YpnVdTUoIqX0rm8/G6W2+TtLxbI60Xdh68hLe1cO3isVgtV0N8HSNQYWqhCY0kWSd4PB2v8FgQYbntpZ+fkOqSF0u89S8jko291rqnmiI1cQD5Xoz1Tcbw0inSYy3D/BXu7Ocr1QlSbsUH+m5OqxaYtkSJfkX1jkqm+de7WLkSvL3EdwDFKNlXmNNd2s0zWf7/X6W2/tsTVBQUFBQUFBQUFBQNf0HfRypfJTVuZMAAAAASUVORK5CYII='
        } alt={product.name} />
      </Link>
      <div className='card-body'>
        <Link to={link}>
          <h2>{product.name}</h2>
        </Link>

        { product.rating && 
          <Rating rating={product.rating} numReviews={product.numReviews} />
        }

        <div className='row'>
          <div className='price'>
            {formatPrice(product.price)}
          </div>
          <div>
            <Link to={`/s/${product.seller.id}`}>{product.seller.name}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
