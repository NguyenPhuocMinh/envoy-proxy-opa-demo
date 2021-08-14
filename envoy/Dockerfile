FROM envoyproxy/envoy:v1.19.0

COPY envoy-v3.yaml /etc/envoy/envoy-v3.yaml
COPY ./run_envoy.sh /run_envoy.sh
RUN chmod go+r -R /etc/envoy/envoy-v3.yaml \
    && chmod go+rx /run_envoy.sh /etc/envoy/envoy-v3.yaml /etc/envoy/envoy-v3.yaml
CMD ["/bin/sh", "/run_envoy.sh"]