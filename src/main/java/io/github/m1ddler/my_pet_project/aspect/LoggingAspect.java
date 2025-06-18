package io.github.m1ddler.my_pet_project.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;


@Aspect
@Component
public class LoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* io.github.m1ddler.my_pet_project.service.impl.*.*(..))")
    public Object AroundLogAllServicesAspect(ProceedingJoinPoint pjp) throws Throwable {
        String methodName = pjp.getSignature().toShortString();
        long startTime;
        long endTime;

        Object result;
        try {
            startTime = System.currentTimeMillis();
            result = pjp.proceed();
            endTime = System.currentTimeMillis();
        }
        catch (Throwable ex) {
            Optional<StackTraceElement> firstAppFrame = Arrays.stream(ex.getStackTrace())
                    .filter(ste -> ste.getClassName().startsWith("io.github.m1ddler"))
                    .findFirst();
            if (firstAppFrame.isPresent()) {
                log.error("Handle Exception in {} method {} at {} line", methodName, ex,
                        firstAppFrame.get().getLineNumber());
            }
            else{
                log.error("Handle Exception in {} method", methodName, ex);
            }
            throw ex;
        }
        log.info("Completed {} method in {} ms", methodName, endTime - startTime);
        return result;
    }
}
