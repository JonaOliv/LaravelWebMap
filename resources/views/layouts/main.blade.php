<html>
    <head>
        <title>App Name - @yield('title')</title>
	@section('css-libs')
            This is the css libs section.
        @show
    </head>
    <body> 
        <div class="container">
            @yield('content')
        </div>
	@section('js-libs')
            This is the js libs section.
        @show
    </body>
</html>
