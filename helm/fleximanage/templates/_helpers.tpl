{{/*
Expand the name of the chart.
*/}}
{{- define "fleximanage-api.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "fleximanage-api.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "fleximanage-api.labels" -}}
helm.sh/chart: {{ include "fleximanage-api.name" . }}-{{ .Chart.Version | replace "+" "_" }}
{{ include "fleximanage-api.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "fleximanage-api.selectorLabels" -}}
app.kubernetes.io/name: {{ include "fleximanage-api.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
