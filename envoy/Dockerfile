FROM envoyproxy/envoy-dev:b54919c7476f3d9c1d60a2bbab8421f456826315

COPY envoy-v3.yaml /etc/envoy/envoy-v3.yaml
COPY ./run_envoy.sh /run_envoy.sh
RUN chmod go+r -R /etc/envoy/envoy-v3.yaml \
    && chmod go+rx /run_envoy.sh /etc/envoy/envoy-v3.yaml /etc/envoy/envoy-v3.yaml
CMD ["/bin/sh", "/run_envoy.sh"]