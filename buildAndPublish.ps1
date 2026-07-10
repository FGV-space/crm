# Percorso del file package.json
$packageJsonPath = "package.json"

# Carica il contenuto del file package.json come oggetto JSON
$jsonContent = Get-Content -Raw -Path $packageJsonPath | ConvertFrom-Json

# Legge il valore della chiave "version"
$version = $jsonContent.version

# Pulisci distribuzione
$npmClean = "npm run crm-clean"
Invoke-Expression -Command $npmClean

# Compila distribuzione
$npmBuild = "npm run crm-build"
Invoke-Expression -Command $npmBuild

# Genera l'immagine docker
$dockerBuildCommand = "docker buildx build --load -t velocar1/vms-crm:$version ."
Invoke-Expression -Command $dockerBuildCommand

# Genera il file sbom.json
$sbomCommand = "syft velocar1/vms-crm:$version -o spdx-json > sbom.json"
Invoke-Expression -Command $sbomCommand

# Carica l'immagine docker sul repository
# $dockerPushCommand = "docker push velocar1/vms-crm:$version"
# Invoke-Expression -Command $dockerPushCommand
$builderCommand = "docker buildx build --builder velocar --tag velocar1/vms-crm:$version --sbom=true --attest type=provenance,mode=max --push ."
Invoke-Expression -Command $builderCommand

# Elimina il deployment
$kubectlDeleteDeployment = "kubectl delete deployment vms-crm -n vms"
Invoke-Expression -Command $kubectlDeleteDeployment

# Applica il deployment
$kubectlApply = "kubectl apply -f .\manifests\deployment.yaml"
Invoke-Expression -Command $kubectlApply
