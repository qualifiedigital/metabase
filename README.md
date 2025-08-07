# Metabase Container

This repository contains a Docker container setup for running Metabase, an open-source business intelligence and analytics platform.

## Overview

Metabase is a powerful tool for creating dashboards and visualizations from your data. This containerized setup provides a complete runtime environment for Metabase with proper security configurations and database management.

## Project Structure

```
metabase/
├── container-files/          # Complete container filesystem
│   ├── app/                  # Application directory
│   │   ├── certs/           # SSL certificates
│   │   └── run_metabase.sh  # Container startup script
│   ├── bin/                  # System binaries
│   ├── lib/                  # System libraries
│   ├── opt/java/openjdk/     # Java runtime environment
│   ├── sbin/                 # System administration binaries
│   └── usr/                  # User space applications
├── certs/                    # SSL certificates directory
├── run_metabase.sh          # Main startup script
├── .gitattributes           # Git LFS configuration
└── .gitignore              # Git ignore rules
```

## Key Components

### Container Filesystem (`container-files/`)
A complete Alpine Linux-based filesystem containing:
- **Java Runtime**: OpenJDK for running Metabase
- **System Tools**: Essential binaries and libraries
- **Application Files**: Metabase JAR and configuration
- **Security**: Proper user/group setup for non-root execution

### Startup Script (`run_metabase.sh`)
The main entry point that handles:
- **Environment Configuration**: Java options and environment variables
- **Security**: Non-root user execution with proper permissions
- **Database Management**: H2 database file handling and initialization
- **Docker Secrets**: Support for Docker secrets via `_FILE` environment variables
- **Signal Handling**: Proper shutdown and signal management

### SSL Certificates (`certs/`)
Directory for storing SSL certificates for secure HTTPS connections.

## Features

- **Security First**: Runs Metabase as non-root user (metabase:metabase)
- **Flexible Configuration**: Supports environment variables and Docker secrets
- **Database Management**: Automatic H2 database initialization and migration
- **Production Ready**: Proper signal handling and graceful shutdown
- **Docker Optimized**: Designed for containerized deployments

## Environment Variables

The container supports various environment variables for configuration:

### Database Configuration
- `MB_DB_USER` / `MB_DB_USER_FILE`: Database username
- `MB_DB_PASS` / `MB_DB_PASS_FILE`: Database password
- `MB_DB_CONNECTION_URI` / `MB_DB_CONNECTION_URI_FILE`: Database connection string

### Email Configuration
- `MB_EMAIL_SMTP_PASSWORD` / `MB_EMAIL_SMTP_PASSWORD_FILE`: SMTP password
- `MB_EMAIL_SMTP_USERNAME` / `MB_EMAIL_SMTP_USERNAME_FILE`: SMTP username

### LDAP Configuration
- `MB_LDAP_PASSWORD` / `MB_LDAP_PASSWORD_FILE`: LDAP password
- `MB_LDAP_BIND_DN` / `MB_LDAP_BIND_DN_FILE`: LDAP bind DN

### Java Configuration
- `JAVA_OPTS`: Additional Java options
- `JAVA_TIMEZONE`: Timezone setting
- `MB_JETTY_HOST`: Host binding (defaults to 0.0.0.0)

### User/Group Configuration
- `MGID`: Group ID for metabase user (default: 2000)
- `MUID`: User ID for metabase user (default: 2000)

## Usage

### Basic Usage
```bash
docker run -p 3000:3000 metabase
```

### With Custom Database
```bash
docker run -p 3000:3000 \
  -e MB_DB_TYPE=postgres \
  -e MB_DB_DBNAME=metabase \
  -e MB_DB_PORT=5432 \
  -e MB_DB_USER=metabase \
  -e MB_DB_PASS=password \
  -e MB_DB_HOST=postgres \
  metabase
```

### With Docker Secrets
```bash
docker run -p 3000:3000 \
  --secret db_password \
  -e MB_DB_PASS_FILE=/run/secrets/db_password \
  metabase
```

## Development

### Building the Container
The container filesystem is pre-built and included in the `container-files/` directory. This approach ensures consistency and reduces build time.

### Large File Handling
JAR files are managed using Git LFS to handle large binary files efficiently.

## Security Considerations

- Runs as non-root user (metabase:metabase)
- Supports Docker secrets for sensitive data
- Proper file permissions and ownership
- Secure database file handling
- Signal handling for graceful shutdown

## License

This project is part of the Metabase ecosystem. Please refer to Metabase's licensing terms for usage rights and restrictions.

## Contributing

When contributing to this container setup:
1. Ensure security best practices are maintained
2. Test with various database configurations
3. Verify proper signal handling
4. Update documentation for any new features

## Support

For issues related to:
- **Metabase Application**: Visit [Metabase GitHub](https://github.com/metabase/metabase)
- **Container Setup**: Check this repository's issues
- **General Questions**: Refer to Metabase documentation 