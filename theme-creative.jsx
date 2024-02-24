import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
      'primary': {
        100: 'hsl(190, 77%, 88%)',
        '100.20': 'hsla(190, 77%, 88%, 0.2)',
        '100.50': 'hsla(190, 77%, 88%, 0.5)',
        200: 'hsl(190, 76%, 82%)',
        300: 'hsl(189, 75%, 75%)',
        400: 'hsl(190, 74%, 59%)',
        500: 'hsl(190, 100%, 42%)',
        600: 'hsl(195, 100%, 39%)',
        700: 'hsl(201, 100%, 36%)',
        800: 'hsl(214, 97%, 27%)',
        900: 'hsl(239, 94%, 19%)'
      },
      'gradients': {
        cta: 'linear-gradient(#0096C7, #023E8A)',
        tile: 'linear-gradient(#48CAE4 0%, #48CAE4 80%, #00B4D8 80%, #00B4D8)'
      }
    },
    shadows: {
        'bg': 'inset 0px 0px 40px hsla(239, 94%, 19%, .25), 0px 0px 40px hsla(239, 94%, 19%, .5)'
    }
})