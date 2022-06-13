# Desafío BSALE - FrontEnd
Aplicación FrontEnd de Tienda en línea desarrollada con Vanilla JS y SASS, con el fin de interactuar con el sistema Backend https://github.com/rayfn98/bsale-backend
y la base de datos proporcionada por BSALE

## Demo
https://bsale-rayflores.herokuapp.com/

## Pre-requisitos
- Instalar sistema backend https://github.com/rayfn98/bsale-backend}
- HEROKU CLI
- Librería CDN axios

- Complementarios / Opcionales
  - CDN Fontawesome 5.*
  - CDN Lottiefiles https://lottiefiles.github.io/lottie-player/installation.html
  - SASS


## Explicación / Tutorial
- Página de Inicio y notificación de conexión hecha, la 1era conexión puede tardar por el servidor Heroku de backend
  
  ![image](https://user-images.githubusercontent.com/47233742/173272479-3e943b50-d80b-48d0-886c-741fcfe705db.png)
  
- El BANNER inicial obtiene una oferta aleatoria del backend cada 7 segundos
  A la vez es una prueba del Keep Alive implementado en el Backend
  
  ![image](https://user-images.githubusercontent.com/47233742/173273311-61dc1554-df4d-4228-a905-cfddd672af84.png)
  
- FILTRAR por: CATEGORÍA y BÚSQUEDA por Nombre, implementados a nivel de backend, con funcionalidades como resultados rápidos y acciones rápidas
  
  ![image](https://user-images.githubusercontent.com/47233742/173273623-737eaaea-563c-4399-9957-4e7f11b6bce1.png)
  
- RESULTADOS de filtros con opciones de volver a ver todos los productos, también se cuenta con un sorteador de productos
  
  ![image](https://user-images.githubusercontent.com/47233742/173273703-afeaebf5-c503-4ffd-a54f-6312d1985580.png)
  
- PAGINACIÓN con botón para volver a la parte de arriba
  
  ![image](https://user-images.githubusercontent.com/47233742/173274562-92dd426a-9dd1-43a8-82b7-d0d9623d7426.png)
  
- EJEMPLO: Productos de categoría RON sorteados por Precio de menor a mayor
  
  ![image](https://user-images.githubusercontent.com/47233742/173273812-c4333eba-9b58-4ee9-a1cc-5e8f1cb04e56.png)
  
- AÑADIR AL CARRITO con opción de cantidad
  
  ![image](https://user-images.githubusercontent.com/47233742/173273879-032dcc2b-9a3b-49bb-9eff-928b67b68211.png)
  
- VER PEDIDO - Contiene un indicador del total de Items agregados, no cuenta productos repetidos y la cantidad de productos
  Es decir, si se tiene un producto con 5 en cantidad, el botón seguirá señalando 1 con el fin de mostrar la cantidad de productos diferentes
  
  ![image](https://user-images.githubusercontent.com/47233742/173273972-501a8ed0-03c4-45ea-8771-05bb16d27e6b.png)
  
- TABLA DE PEDIDO, contiene opciones para modificar o eliminar la cantidad de productos actualizando los totales y se guarda en localStorage para no perder los datos
  El botón pagar limpia la lista del carrito y muestra una Animación
  
  ![image](https://user-images.githubusercontent.com/47233742/173274364-ff199f1a-c748-49fc-af09-249deeaaab27.png)
  
- CONTROL DE ERRORES:
  - Cuenta con notificaciones al fallar las peticiones al servidor
  - Notificaciones de ERROR al añadir producto, filtrar, etc
  - Boton de REINTENTAR en caso de no obtener productos  
  - Validación de entradas en inputs
  - Validación de botones, en caso de carrito vació etc.
 
- RESPONSIVE: Diseño totalmente responsive y con funcionalidades de ayuda al usuario
  
![image](https://user-images.githubusercontent.com/47233742/173274760-8859314e-b24d-435d-bb7f-087dafcc5ec1.png)

![image](https://user-images.githubusercontent.com/47233742/173274927-5f6d0f82-8f8a-46b7-b18b-b5fd8470b779.png)

![image](https://user-images.githubusercontent.com/47233742/173274953-f3bf5486-c192-44d4-81ce-cc80c8d0d8a5.png)



 
## Instalación
1. Clonar el proyecto https://github.com/rayfn98/desaf-o_bsale/
2. Ingresar al proyecto ``` cd <proyecto> ```
3. En el caso de no haber inicializado git
```bash
 git init
 git branch -M main
 git add -A
 git commit -m "Git inicializado"
```
3. Iniciar sesión en Heroku y crear app:
```bash
heroku login
```
- Luego de iniciar sesión 
```bash
-  heroku apps:create <nombre_app>
```
6. Subir proyecto a Heroku: 
```bash 
git push heroku main
```
## Aviso:
* Se usó una versión minificada de los archivos JS para simular el uso de Webpack o Babel
* Herramienta: https://developers.google.com/closure/compiler/docs/gettingstarted_ui?csw=1

## Autor
Ray Flores Nolasco
### Contacto
- WhatsApp: +51929044032
- Email: rayfn98@gmail.com
- Linkedin: https://www.linkedin.com/in/rayfloresnolasco/
