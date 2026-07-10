### Express
```
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
```

### Apache .htaccess
```
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx .conf
```
location / {
    if (!-e $request_filename) {
        rewrite ^(.*)$ /index.html break;
    }
}
```

### Build immagine Docker
```
docker build -t velocar/vms-client . --no-cache=true
```

### Scouting vulnerabilities
```
docker scout cves velocar1/vms-crm:<version>
```
