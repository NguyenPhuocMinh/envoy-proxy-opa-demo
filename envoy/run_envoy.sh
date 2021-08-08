#!/bin/sh

/usr/local/bin/envoy -c "/etc/envoy/${FRONT_ENVOY_YAML}" -l ${DEBUG_LOG} --service-cluster front-proxy