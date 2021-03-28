FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY lib-manager-service/*.csproj ./
RUN dotnet restore


COPY lib-manager-service/ ./
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs 
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
ENV PORT=8080
ENTRYPOINT ["dotnet", "lib-manager-service.dll"]
